install:
	npm ci
<<<<<<< HEAD

lint:
	npx eslint .

=======
publish:
	npm publish --dry-run
lint:
	npx eslint .
>>>>>>> 907398e81dd268bcbdd2f950265d3aaf770e22a8
fix:
	npx eslint --fix .

develop:
	npx webpack serve

build:
	NODE_ENV=production npx webpack

test:
	npm test

.PHONY: test