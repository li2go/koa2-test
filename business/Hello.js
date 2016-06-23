import returnNext from '../lib/common/returnNext';

export default class Hello {
	constructor(name) {
		this.name = name;
	}

	hello() {
		return returnNext(null, 200, this.name);
	}
}