# FreeCodeCamp Image Search Abstraction Layer

## User stories:
1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.
3. I can get a list of the most recently submitted search strings.

## Example query usage:

```js
https://image-search-abst.herokuapp.com/api/imagesearch/spongebob
https://image-search-abst.herokuapp.com/api/imagesearch/spongebob/?offset=10
https://image-search-abst.herokuapp.com/api/history
```