document.addEventListener('DOMContentLoaded', () => {
    
    fetchMarketTrends();
});

async function fetchMarketTrends() {
    const url = 'https://real-time-finance-data.p.rapidapi.com/market-trends?trend_type=MARKET_INDEXES&country=us&language=en';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd2f8d2b386msha36059f4547534ep16573fjsn69f58e77c3f7', 
            'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        displayForecast(result);
        displayNews(result); 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function displayForecast(data) {
    const forecastElement = document.getElementById('stock-forecast');
    forecastElement.innerHTML = `<h2>Market Trends</h2>`;
    
    
    data.data.trends.forEach(trend => {
        const trendElement = document.createElement('div');
        trendElement.innerHTML = `
            <p><strong>${trend.name}</strong>: ${trend.price} (${trend.change})</p>
        `;
        forecastElement.appendChild(trendElement);
    });
}


function displayNews(data) {
    const newsElement = document.getElementById('stock-news');
    newsElement.innerHTML = `<h2>Latest News</h2>`;
    
   
    data.data.news.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.innerHTML = `
            <p><strong>${article.article_title}</strong></p>
            <p><a href="${article.article_url}" target="_blank">Read more</a></p>
        `;
        newsElement.appendChild(articleElement);
    });
}
