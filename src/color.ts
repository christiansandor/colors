import * as Color from 'color';
import { createCanvas } from 'canvas';
import { Stream } from 'stream';

export const hexFormatRegexp = /^([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
export const hslFormatRegexp = /^hsl(a|)\(\d{1,3},\d{1,3},\d{1,3}(,(0|)\.\d|,1|)\)$/i;
export const degFormatRegexp = /^\d{1,3}$/i;

export function getColorFromString(colorString: string) {
    if (!colorString) {
        return null;
    }

    if (hexFormatRegexp.test(colorString)) {
        return Color('#' + colorString.toUpperCase());
    }

    if (hslFormatRegexp.test(colorString)) {
        colorString = colorString.replace(/,(\d{1,3}),(\d{1,3})/, (_, a, b) => ',' + a + '%,' + b + '%');
    }

    return Color(colorString.replace(/,/g, ', '));
}

export function getJpegStream(type: string, colors: Color[], deg?: number, size?: string, text?: string): Stream {
    let height = 200;
    let width = 200;

    if (size) {
        const [h, w] = size.split('x');
        height = parseInt(h, 10);
        width = parseInt(w, 10) || height;
    }

    const canvas = createCanvas(width, height);
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    if (type === 'color') {
        ctx.fillStyle = colors[0].toString();
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (type === 'gradient') {
        const grd = ctx.createLinearGradient(0, 0, canvas.width, (deg / 360) * canvas.height);
        grd.addColorStop(0, colors[0].toString());
        grd.addColorStop(1, colors[1].toString());

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (text) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 4;
        ctx.font = `${canvas.height / 3}px bold sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    }

    return canvas.jpegStream();
}

export function getHslDegreeFromHash(hash: string) {
    return hash.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360;
}
