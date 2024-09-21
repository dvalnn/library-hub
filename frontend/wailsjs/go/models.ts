export namespace app {
	
	export class Student {
	    name: string;
	    class: string;
	    process_number: number;
	
	    static createFrom(source: any = {}) {
	        return new Student(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.class = source["class"];
	        this.process_number = source["process_number"];
	    }
	}

}

