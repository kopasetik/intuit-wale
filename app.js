// making api call to fetch subreddits
fetch('https://www.reddit.com/subreddits/search.json?q=reactjs')
  // converting response into JSON
	.then(res => res.json())
  // reshaping data for easy consumption
	.then(json => {
		return Promise.all(json.data.children.map(c => c.data))
	})
  // creating rows from results
	.then(subreddits => {
		const subs = subreddits
    // destructuring results to filter out unnecessary data
      .map(({display_name, subscribers, public_description}) =>{
        Array.from(document.getElementsByTagName('tbody'), (tbody) => {
          // adding a row for each subreddit 
          tbody.innerHTML += `<tr><td class="title">${display_name || 'N/A'}</td>`
            + `<td class="subs">${subscribers || 'N/A'}</td>`
            + `<td class="description">${public_description || 'N/A'}</td></tr>`
        })

        return {
          display_name,
          subscribers,
          public_description
        }
      })

    // returning data in case of extending functionality
    return subs
  })
