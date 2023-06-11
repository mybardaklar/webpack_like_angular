import SpriteSheet from './SpriteSheet';
import { loadImage } from './loaders';

// ==> resolve output filename
import imgFilename from '../assets/img/tiles.png';

console.log('>> IMG: ', imgFilename);

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

context.fillRect(0, 0, 50, 50);

// ==> the argument expected a resolved output filename, NOT source file
loadImage(imgFilename).then((image) => {
const sprites = new SpriteSheet(image, 16, 16);
	sprites.define('ground', 0, 0);
	sprites.define('sky', 3, 23);
	sprites.draw('ground', context, 45, 62);
});
