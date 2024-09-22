export namespace app {
	
	export class Agent {
	    process_number: number;
	    agent_kind: number;
	    name: string;
	    class: string;
	
	    static createFrom(source: any = {}) {
	        return new Agent(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.process_number = source["process_number"];
	        this.agent_kind = source["agent_kind"];
	        this.name = source["name"];
	        this.class = source["class"];
	    }
	}

}

