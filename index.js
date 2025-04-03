const { McpServer, ResourceTemplate } = require("@modelcontextprotocol/sdk/server/mcp.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { z } = require('zod');

const server = new McpServer({
	name: 'Weather data fetcher.',
	version: '1.0.0'
})

async function getWeatherDataByCityName(city) {
	city = city.toLowerCase();

	if (city === 'ahmedabad') {
		return {
			temp: '30C',
			forecast: `Chances of high rain`
		}
	}

	if (city === 'delhi') {
		return {
			temp: '50C',
			forecast: `Chances of high heat wave`
		}
	}

	return {
		temp: null,
		error: 'Unable to get the data.'
	}
}

server.tool('getWeatherDataByCityName', { city: z.string() }, async ({ city }) => {
	return {
		content: [
			{
				type: 'text',
				text: JSON.stringify(await getWeatherDataByCityName(city))
			}
		]
	}
})


async function init() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
}

init();