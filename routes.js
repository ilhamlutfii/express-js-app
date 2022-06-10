const express = require('express');

const courseAdmin = require('./controllers/course-admin');
const coursePublic = require('./controllers/course-public');
const categoryPublic = require('./controllers/category-public');
const categoryPublic = require('./controllers/profile-admin');

const router = express.Router();

// admin
router.get('/admin/courses', courseAdmin.all);
router.post('/admin/courses', courseAdmin.create);
router.get('/admin/courses/:id', courseAdmin.show);
router.put('/admin/courses/:id', courseAdmin.update);
router.delete('/admin/courses/:id', courseAdmin.destroy);
router.get('/admin/profiles', profileAdmin.all);
router.post('/admin/profiles', profileAdmin.create);
router.put('/admin/profiles/:id', profileAdmin.update);
router.delete('/admin/profiles/:id', profileAdmin.destroy);

// public
router.get('/public/courses', coursePublic.all);
router.get('/public/courses/:id', coursePublic.show);
router.get('/public/categories', categoryPublic.all);
router.get('/public/categories/:id', categoryPublic.show);

module.exports = router;
