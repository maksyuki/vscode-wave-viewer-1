# vscode-wave-viewer-1

## 1. Introduction
This is the VSCode extension for verilog waredorm view based on ts/js and d3.js.

This extension renders signal dumps into specified svg.

## 2. Installation
```bash
git clone https://github.com/maksyuki/vscode-wave-viewer-1.git # clone this library
npm install            # normaldependencies
npm install --only=dev # developement only dedpendencies
```
## 3. Build and Test
1. If you develop under **WinOS**, you can run following `npm commands` in cmd or powershell directly.
```bash
npm run build          # build and bundle code to 'dist' folder
npm test               # run tests(optional)
npm run coveralls      # run coverage tests(optional)
```
2. If you develop under **Linux or MacOS**, you need to **modify package.json** first  before you run `npm commands`:
```json
// "build": "rmdir /s/q dist && mkdir dist && set NODE_ENV=production && rollup -c"
"build": "rm -rf dist && mkdir dist && NODE_ENV=production rollup -c"

// "clean": "rmdir /s/q dist/ node_modules/"
"clean": "rm -rf dist/ node_modules/"

//"test": "set NODE_ENV=development && jest"
"test": "NODE_ENV=development jest"

//"coveralls": "set NODE_ENV=development && jest --coverage && type ./tests/coverage/lcov.info | coveralls"
"coveralls": "NODE_ENV=development jest --coverage && cat ./tests/coverage/lcov.info | coveralls"
```




## 4. Run
### 4.1 Run in browser
If you have installed `python3+` and added it to the environment path, enter the following command:
```python
python -m http.server
```
If you have installed `python2+`, enter the following command:
```python
python -m SimpleHTTPServer
```
1.  This command will start a http server(http://0.0.0.0:8000) in current folder.
2. Open this address in browser(http://127.0.0.1:8000) and click link on page to visit the `./examples/viewer.html` to run example.

### 4.2 Run in VSCode
1. Open the `vscode-wave-viewer-1` folder in VSCode, and press `F5` to run the extenion in debug mode.

2. Press `Ctrl+Shift+P` to open command palette and enter `wave viewer` to run extension.

### 4.3 Open the VCD file
1. After you run in browser or in VSCode, click `select file` buttion in page.
2. Select the json file `./examples/vcd_small_*.json` or `./examples/vcd_middle.json`, and then the waveform will display on the screen.

## 5. Features
* Vertical scrolling and zoom in time domain
* Tree based signal hierarchy view (collapsable)
* Signal tree scrollbar with preview
* Drag-and-drop/key based signal organization
* Renderers for int, str, bit, enum and bit vector values (user extendible)
* Dynamic time unit on x-axis
* Responsive design
* Arbitrary integer values

## 6. Acknowledgements
* [d3-wave](https://github.com/Nic30/d3-wave) (License in [3rd_party_licenses/LICENSE](3rd_party_licenses/LICENSE))

