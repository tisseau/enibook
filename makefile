TCS=tsc
NODE=node
BUILDDIR=site

enibook.js: tsconfig.json src/document.ts src/tools.ts
	${TCS}

clean:
	rm -f ${BUILDIR}/enibook.js
