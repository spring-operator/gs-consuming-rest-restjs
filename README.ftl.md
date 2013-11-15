<#assign project_id="gs-consuming-rest-restjs">
This guide walks you through the process of consuming a simple
[rest.js](http://github.com/cujojs/rest/) that consumes a
Spring MVC-based [RESTful web service][u-rest].

What you'll build
-----------------

You will build a rest.js client that consumes a Spring-based RESTful web service.
Specifically, the client will consume the service created in
[Building a RESTful Web Servce][gs-rest-service].

The rest.js client will be accessed by opening the `index.html` file in
your browser, and will consume the service accepting requests at:

    http://rest-service.guides.spring.io/greeting

The service will respond with a [JSON][u-json] representation of a greeting:

```json
{"id":1,"content":"Hello, World!"}
```

The client will render the ID and content into the DOM.

You can customize the greeting with an optional *query string* in the url:

    http://localhost:8080/?User

The code will send a parameter to the REST endpoint and
render a custom greeting into the DOM.


What you'll need
----------------

 - About 15 minutes
 - A favorite text editor
 - A modern web browser
 - An internet connection
 - [node.js](http://nodejs.org/) and [git](http://git-scm.com/)
   pre-installed
 - [bower](http://bower.io) installed as a global node.js package

<a name="scratch"></a>
<a name="initial"></a>
Create bower configuration files
---

First, create a bower control file, `.bowerrc`.  This file tells bower
where to put the JavaScript dependencies.  The `.bowerrc` file should
be located at the root of the project (`${project_id}/initial`) and
formatted as JSON:

```js
{
	"directory": "public/lib"
}
```

From a command prompt, run `bower init` at the root of the
project.  This will create a `bower.json` file that describes the
JavaScript packages required by the project.  Bower will ask for several
bits of information such as a project name, license, etc.  If in doubt,
just press `Enter` to accept the defaults.

There should now be a `bower.json` file in the project's root directory.
It should look similar to the following:

```js
{
  "name": "draft-consuming-rest-restjs",
  "version": "0.0.0",
  "authors": [
    "John Hann <jhann@gopivotal.com>"
  ],
  "license": "http://www.apache.org/licenses/LICENSE-2.0",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "src/main/resources/static/lib",
    "test",
    "tests"
  ]
}
```

Next, use bower to install rest.js and an AMD module loader such as
curl.js.  Both of these JavaScript packages' github repositories are
listed in the bower directory as the shortcuts, "rest" and "curl".

Bower can install specific versions of packages if those packages
use semantic versioning ([semver](http://semver.org)) rules.  Append a
`#` followed by the version number.  For rest.js version 1.x.y and
curl.js version 0.8.x, use "rest#~1" and "curl~0.8".

From a command prompt within the project directory tree, type:

```
bower install --save rest#~1
```

```
bower install --save curl#~0.8
```

Bower will display status as it locates the required versions of
rest.js and curl.js and installs them into the directory we listed
in `.bowerrc`.  Since we specified the `--save` option, bower will
store the package information in the `bower.json` file.

> **Note:** Bower will recursively find `bower.json` files within the packages
in order to find and install further dependencies.  Bower should discover
that rest.js depends on when.js and install a compatible version.

When done, the `bower.json` file should have a "dependencies"
object property that lists "curl" and "rest" as property names and
their semver information as values:

```js
{
  "name": "draft-consuming-rest-restjs",
  "version": "0.0.0",
  "authors": [
    "John Hann <jhann@gopivotal.com>"
  ],
  "license": "http://www.apache.org/licenses/LICENSE-2.0",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "src/main/resources/static/lib",
    "test",
    "tests"
  ],
  "dependencies": {
    "curl": "~0.8",
    "rest": "~1"
  }
}
```


Create a Render Module
---

First, create a render function to inject data into an HTML document.

<@snippet path="public/hello/render.js" prefix="complete"/>

This module uses simple DOM querying and manipulation to inject text
into the document.  To ensure that the DOM is not used before it is
ready, the render module imports and uses curl.js's `domReady`
function-module.

> **Note:** In a real application, you'll want to use *data binding* or
*templating*, rather than DOM manipulation as shown here.


Create an Application Composition module
---

Next, create a module that will compose the application.

<@snippet path="public/hello/main.js" prefix="complete"/>

The main module reads the query string from the document's location
object, configures a rest.js mime client, and calls the REST endpoint.

rest.js returns a [Promises/A+ promise](http://know.cujojs.com/tutorials/promises/consuming-promises),
which will call the render function-module when the endpoint returns
data.  The render function expects the entity, but the rest.js client
returns a response object.  The `pluckEntity` function is inserted into
the promise chain to transform the rest.js output into the input expected
by the render function.


Create the Application Page
---

Next, create an `index.html` file and add the following HTML:

<@snippet path="public/index.html" prefix="complete"/>

The `script` element loads curl.js and then loads an *application boot
script* named "run.js".  The boot script initializes and configures
an AMD module environment and then starts the client-side application code.

Finally, create the boot script, `run.js`:

<@snippet path="public/run.js" prefix="complete"/>

This script configures the AMD loader: `curl.config()`.  The `main`
configuration property tells curl.js where to find the application's
main module, which will be fetched and evaluated automatically.
The `packages` config object tells curl.js where to find modules
in our application's packages or in third-party packages.


<a name="run"></a>
Run the client
--------------

You can now run the app using the Spring Boot CLI (Command Line Interface). Spring Boot includes an embedded Tomcat server, which offers a simple approach to serving web content. See [Building an Application with Spring Boot][gs-spring-boot] for more information about installing and using the CLI.

```sh
$ spring run app.groovy
```

Once the app starts, open http://localhost:8080 in your browser, where you see:

![Model data retrieved from the REST service is rendered into the DOM.](images/hello.png)

The ID value will increment each time you refresh the page.


Summary
-------

Congratulations! You've just developed a rest.js client that consumes a
Spring-based RESTful web service.

[gs-rest-service]: /guides/gs/rest-service/
[gs-spring-boot]: /guides/gs/spring-boot/
[zip]: https://github.com/spring-guides/${project_id}/archive/master.zip
<@u_rest/>
<@u_json/>
<@u_git/>
