TESTS = $(shell ls -S `find test -type f -name "*.test.js" -print`)
REPORTER = spec
TIMEOUT = 3000
MOCHA_OPTS =
REGISTRY = "--registry=http://registry.npm.taobao.org"

install:
	@npm install $(REGISTRY)

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
	  --harmony \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-cov:
	@NODE_ENV=test node --harmony \
		node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha \
		-- -u exports \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

test-travis:
	@NODE_ENV=test node --harmony \
		node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha \
		--report lcovonly \
		-- -u exports \
		--reporter $(REPORTER) \
		--timeout $(TIMEOUT) \
		$(MOCHA_OPTS) \
		$(TESTS)

watch:
	@./node_modules/.bin/watchify \
		public/js/app.js \
		--debug \
		--transform reactify \
		--transform envify \
		-v \
		-o public/js/bundle.js

build:
	@NODE_ENV=production ./node_modules/.bin/browserify \
	public/js/app.js \
	--transform reactify \
	--transform envify \
	-o public/js/bundle.js
	./node_modules/.bin/uglifyjs public/js/bundle.js --compress --output public/js/bundle.min.js

gh-pages:
	echo "Build gh-page ..."
	git branch -D gh-pages
	git push origin --delete gh-pages
	git checkout -b gh-pages
	@NODE_ENV=production ./node_modules/.bin/browserify \
	public/js/app.js \
	--transform reactify \
	--transform envify \
	-o public/js/bundle.js
	
	cp views/index.html index.html
	git add .
	git commit -m "Build gh-page"
	git push origin gh-pages
	git checkout master

autod: install
	@./node_modules/.bin/autod -w -e views,public/js/bundle.js $(REGISTRY) --prefix="~"
	@$(MAKE) install

.PHONY: test