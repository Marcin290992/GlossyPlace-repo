import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import post from "./schemas/post";

export default defineConfig({
	name: "glossyplace",
	title: "Glossyplace Journal",
	projectId: "nooi1cuu",
	dataset: "production",
	plugins: [structureTool()],
	schema: {
		types: [post],
	},
});
