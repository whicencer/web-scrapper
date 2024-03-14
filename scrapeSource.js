const puppeteer = require('puppeteer');

async function scrapeSource(movieId, res) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	
	try {
		await page.goto(`https://filmix.biz/play/${movieId}`, {
			waitUntil: 'networkidle2' // Это позволит странице загрузить весь динамический контент
		});
		
		// После полной загрузки страницы получаем URL видео
		const videoSrc = await page.evaluate(() => {
			const video = document.querySelector('pjsdiv#oframeplayer pjsdiv video');
			return video ? video.src : null;
		});
		
		res.json(videoSrc);
	} catch (error) {
		res.send('Невозможно открыть страницу с видео');
		console.log('Невозможно открыть страницу с видео', error);
	} finally {
		await browser.close();
	}
};

module.exports = { scrapeSource };