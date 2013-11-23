annotation-viewer
=================

Viewer pop-over panel for annotations in JS/HTML environments.

Demo
----

* [gh-pages](http://ariutta.github.io/annotation-viewer/demo/)

Input Data Format
-----------------

```json
{
  "x": 80,
  "y": 20,
  "width": 100,
  "height": 200,
  "header": "My Header",
  "description": "My Description",
  "listItems": [
    {
      'key': 'Item Title',
      'values': [
        {
          'text': 'item text1',
          'uri': 'http://www.example.org/1'
        },
        {
          'text': 'item text2'
        }
      ]
    }
  ]
}
```
