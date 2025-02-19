install:
	npm ci

lint:
	npm run lint

fix:
	npx eslint --fix .

develop:
	npx webpack serve

build:
	NODE_ENV=production npx webpack

test:
	npm test

.PHONY: test