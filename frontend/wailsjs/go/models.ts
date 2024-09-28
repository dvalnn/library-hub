export namespace app {
	
	export class Agent {
	    agent_kind: number;
	    name: string;
	    class: string;
	
	    static createFrom(source: any = {}) {
	        return new Agent(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.agent_kind = source["agent_kind"];
	        this.name = source["name"];
	        this.class = source["class"];
	    }
	}
	export class Record {
	    activity: number;
	    agent_id: number;
	
	    static createFrom(source: any = {}) {
	        return new Record(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.activity = source["activity"];
	        this.agent_id = source["agent_id"];
	    }
	}

}

