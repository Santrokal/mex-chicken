const fs = require('fs');
const path = require('path');

const components = ['Navbar', 'MainSection', 'Loader'];

const componentsDir = path.join(__dirname, 'src', 'components');

if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}

const componentTemplate = (name) => `
import React from 'react';

const ${name} = () => {
  return (
    <div>
      <h1>${name} Component</h1>
    </div>
  );
};

export default ${name};
`;

components.forEach((component) => {
  const filePath = path.join(componentsDir, `${component}.js`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, componentTemplate(component));
    console.log(`Created ${component}.js`);
  } else {
    console.log(`${component}.js already exists, skipping...`);
  }
});

console.log('Component creation complete!');