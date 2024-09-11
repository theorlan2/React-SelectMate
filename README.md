# SelectMate

## images


## Usage

To use the Select mate component in your project, simply follow these steps:

1. clone the repository in the same directory of you project:

  ```
  git clone https://github.com/theorlan2/React-SelectMate.git
  ```

2. Install the package using yarn or npm:

   ```
   yarn add ../selectmate
   ```

3. Import the SelectMate component in your React file:

   ```javascript
   import { SelectMate } from 'selectmate';
   ```

4. Use the component in your JSX:

   ```jsx
   <SelectMate options={[...]} onChange={(value) => console.log(value)} />
   ```

## Replace `options` with an array of objects that define each option, where the key is the value and the value is the display text for that option.

## Available Scripts

To run the component using storybook, you can run


### `yarn run dev`

In the project directory. This runs the app in the development mode.\
Open [  http://localhost:6006](  http://localhost:6006) to view it in the browser the demo example.

### `yarn run test`

Launches the test runner in the interactive watch mode.
