module.exports = {
	pageLoaded: (req, res, next) => {
		if (!req.prerender.content || req.prerender.renderType != 'html') {
			return next();
		}

        const { urlsToReplace } = req.prerender;
        const keys = Object.keys(urlsToReplace || {});
        if (!keys.length) {
			return next();
		}

        for (const key of keys) {
            if (!urlsToReplace[key]) {
                continue
            }
            // const regexKey = key.replaceAll('.', '\\.').replaceAll('/', '\\/');
            // const regExp = new RegExp(regexKey, 'gi');
            // const matches = req.prerender.content.toString().match(regExp);
            // if (!matches || !matches.length) {
            //     continue;
            // }
            req.prerender.content = req.prerender.content.toString().replaceAll(key, urlsToReplace[key])
        }

		next();
	}
};