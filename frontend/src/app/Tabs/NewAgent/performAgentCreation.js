import { CreateNewAgent } from "./../../../../wailsjs/go/app/App.js";
import AgentEnum from "../Common/agentEnum.js";

async function performAgentCreation(name, agentCategoryLabel, agentClass) {
    try {
        // Check if the agent object is valid
        if (!name || !agentCategoryLabel) {
            console.error("Invalid agent object:", {
                name,
                agentCategoryLabel,
            });
            return null; // Return null if the agent object is invalid
        }

        const agentCategory = AgentEnum.getValuePT(agentCategoryLabel);
        console.log("Agent category:", agentCategory);
        if (agentCategory === 0) {
            console.error("Invalid agent category:", agentCategoryLabel);
            return null; // Return null if the agent category is invalid
        }

        if (agentCategory === AgentEnum.Student && !agentClass) {
            console.error("Invalid agent class:", agentClass);
            return null; // Return null if the agent category is invalid
        }

        // Create the agent object
        //FIXME: create a function to correcly create the agent object
        const agent = {
            name: name,
            agent_kind: agentCategory,
            class: agentClass,
        };

        // Call the CreateNewAgent function with the agent object
        await CreateNewAgent(agent);
    } catch (error) {
        console.error("Error creating new agent:", error);
        return error; // Return null in case of error
    }
}

export default performAgentCreation;
