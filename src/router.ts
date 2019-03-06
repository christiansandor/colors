import { Router } from 'express';
import { Stream } from 'stream';

import { BadRequestError, NotFoundError } from './errors';
import { degFormatRegexp, getHslDegreeFromHash, getColorFromString, getJpegStream } from './color';

export const router = Router();

// Route handlers

router.get(['/gradient/:color1/:color2/:degree', '/gradient/:color1/:color2', '/color/:color'], function (req, res) {
    const type = req.url.split('/')[1];
    const colorStrings = type === 'gradient' ? [req.params.color1, req.params.color2].filter(Boolean) : [req.params.color];
    const deg = req.params.degree;

    const { text, size, format } = req.query;

    if (type === 'gradient') {
        if (colorStrings.length !== 2) {
            throw new BadRequestError('Gradient needs 2 or 3 parameters');
        }

        if (deg && !degFormatRegexp.test(deg) || +deg > 360) {
            throw new BadRequestError('Invalid gradient degree parameter');
        }
    }

    if (type === 'color' && colorStrings.length !== 1) {
        throw new BadRequestError('Single color needs 1 parameter');
    }

    const colors = colorStrings.map(colorString => {
        try {
            return getColorFromString(colorString);
        } catch (err) {
            throw new BadRequestError(`Invalid color parameter "${colorString}"`);
        }
    });

    if (format === 'json') {
        return res.send(colors);
    }

    const stream = getJpegStream(type, colors, deg ? parseInt(deg, 10) : null, size, text);

    res.setHeader('Content-Type', 'image/jpeg');
    stream.pipe(res);
});

router.get(['/avatar/gradient/:hash', '/avatar/:hash'], function (req, res) {
    const { hash } = req.params;
    if (!hash) {
        throw new BadRequestError('Invalid hash parameter');
    }

    const { text, size, format } = req.query;
    const isGradient = req.url.split('/')[2] === 'gradient';
    const deg = getHslDegreeFromHash(hash);
    const colors = [getColorFromString(`hsl(${deg},100%,50%)`)];

    if (isGradient) {
        colors.push(getColorFromString(`hsl(${(deg + 100) % 360},100%,50%)`));
    }

    if (format === 'json') {
        return res.send(colors);
    }

    let stream: Stream;
    if (isGradient) {
        colors.push(getColorFromString(`hsl(${(deg + 100) % 360},100%,50%)`));
        stream = getJpegStream('gradient', colors, 270, size, text);
    } else {
        stream = getJpegStream('color', colors, null, size, text);
    }

    res.setHeader('Content-Type', 'image/jpeg');
    stream.pipe(res);
});

// Error handlers

router.use(function (req, res, next) {
    next(new NotFoundError());
});

router.use(function (err, req, res, next) {
    if (err instanceof NotFoundError) {
        res.status(404);
    } else if (err instanceof BadRequestError) {
        res.status(400);
    } else {
        console.error(err);
        res.status(500);
    }

    res.send(err.message);
});
