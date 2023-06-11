import SpriteSheet from './SpriteSheet';
import { loadImage } from './loaders';

// ==> load the source image as an object via 'responsive-loader'
import imgFilename from '@assets/img/tiles.png';

// the imported image is an object, see https://github.com/dazuaz/responsive-loader#typescript
console.log('>> IMG: ', imgFilename.src);

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

context.fillRect(0, 0, 50, 50);

// ==> the argument expected as a resolved output filename, NOT source file
loadImage(imgFilename.src).then((image) => {
const sprites = new SpriteSheet(image, 16, 16);
	sprites.define('ground', 0, 0);
	sprites.define('sky', 3, 23);
	sprites.draw('ground', context, 45, 62);
});
