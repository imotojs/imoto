install:
	@npm --registry=http://registry.npm.taobao.org install
	@if [ ! -f "$$(which webpack)" ]; then sudo npm --registry=http://registry.npm.taobao.org install webpack -g; fi

dev: install
	@npm run dev

deploy: install
	@if [ ! -d ghpages ]; then \
		git clone git@github.com:youngerheart/imoto.git --branch gh-pages ghpages; \
	fi; \
	npm run deploy; \
	cp dist/imoto.min.js ghpage && cd ghpages && git add .; \
	git commit -m "update ghpages" && git push origin gh-pages -f
