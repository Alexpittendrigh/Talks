Talk
Afternoon everyone,

<Think of an ice breaker>

My name is Alex, I'm a software engineer at Entelect.
Being a developer at a software consultancy company is both challenging and rewarding.

... some other fluff..

The team I work on is nearing completion of short project for a client who dicated the tech stack to us.
The client's choice of stack was React + Redux + NodeJs + Micrsoft Sequel Server. 
One of the client's requirements  was that the site be optimized for search engine crawlers.
This requirement meant to us that we needed to take advantage of isomorphic rendering / server-side rendering, so that any crawlers had some markup to use for traversing the site and indexing it.
We searched around online for a React based isomorphic rendering seed project.
Eventually we came accross this fantatic, but opinionated, seed project called React Starter Kit; https://github.com/kriasoft/react-starter-kit.
The React Starter Kit's choice of bundler was this odd tool called Webpack.

The client responsible for this project had a well defined corporate identity and provided me with some fonts they wanted used on the site.
When I tried to add the fonts to the site Webpack fashioned me with a poorly worded error, but eventually I found out that I had to add a loader to the Webpack config file.
So, refusing to read the documentation I went straight to Stack Overflow, and, as one does, I found some code I didn't really understand and pasted it into the Webpack config file.
The code didn't work and I then the better part of two days reading blogs, other Stack Overflow posts and various other resource, trying to understand how Webpack worked and how I could get it to budle the client's fonts.
````
Here's what happens when a browser loads a website with a <script> tag on it:
```
1. Fetch the HTML page (e.g. index.html)
Begin parsing the HTML
The parser encounters a <script> tag referencing an external script file.
The browser requests the script file. Meanwhile, the parser blocks and stops parsing the other HTML on your page.
After some time the script is downloaded and subsequently executed.
The parser continues parsing the rest of the HTML document.