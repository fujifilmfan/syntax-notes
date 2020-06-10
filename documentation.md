## Documentation overview
----

## Documentation structure
----
As of ....
```
```

All of the Markdown pages are either in `docs/` or in a `docs/` sub-folder.  It doesn't really 
matter where they go since the `mkdocs.yml` file determines how the pages are laid out on the 
MkDocs web interface (see [Web interface](#web-interface) for more on that), including 
directory structure and page sequence.  However, for ease of use, I have put each page in a 
directory mirroring the web interface.

A few files and directories are not directly represented on the web:

* `/mkdocs.yml` - contains the MkDocs configuration, including layout, extensions, etc.
* `docs/img` - contains images displayed on the pages, also with a sub-directory structure 
reflecting the site
* `docs/src` - contains source code files for inclusion on documentation pages

## Web interface
----
The documentation can be viewed and navigated via web browser using MkDocs.  On MacOS, once MkDocs is installed, the server can be started with the following command:
```bash
$ mkdocs serve --dev-addr 127.0.0.1:8001
```
where `--dev-addr` is used to override the default IP address, I think.  The server polls the docs for changes so that one can see real-time updates to pages as they are written.

!!! note
    Launch `mkdocs` from within an active virtual environment where it is installed.

Helpful MkDocs-related references:

* [MkDocs](https://www.mkdocs.org/)
    * [Writing your docs](https://www.mkdocs.org/user-guide/writing-your-docs/)
* [Material (theme) for MkDocs](https://squidfunk.github.io/mkdocs-material/getting-started/)
    * [Admonition](https://squidfunk.github.io/mkdocs-material/extensions/admonition/) - helpful
   reference for admonition terms and icons
* [markdown-include](https://pypi.org/project/markdown-include/) - Python library that allows 
Python code to be 'included' in the docs via reference to Python files (so the code can be 
runnable and also not have to be copied and pasted wherever it appears in the docs)
* FastAPI has detailed, thorough documentation, so I like to use it as an example for how to 
accomplish certain things via Markdown.
    * [Query Parameters](https://fastapi.tiangolo.com/tutorial/query-params/) - example UI page 
    implementing MkDocs, Material, and markdown-include
    * [Query Parameters](https://raw.githubusercontent.com/tiangolo/fastapi/22982287ff5e8434fdaffcf118d56eb084f2490c/docs/tutorial/query-params.md) - example raw markup
    * [fastapi/mkdocs.yml](https://github.com/tiangolo/fastapi/blob/master/mkdocs.yml) - example YML
