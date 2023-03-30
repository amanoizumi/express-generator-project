const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  /**
   * #swagger.tags = ['Users - 使用者']
   * #swagger.ignore = true
   */
  res.status(200).json({
    name: 'izumi',
  });
});

module.exports = router;
