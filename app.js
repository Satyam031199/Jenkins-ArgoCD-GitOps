const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/hello', (req, res) => {
  console.log('/hello api is working');
  res.send('Hello, This is a Jenkins-ArgoCD-GitOps project');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
