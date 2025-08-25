const FoodRecognitionService = require('../services/foodRecognitionService');
const fs = require('fs');
const path = require('path');

class PhotoController {
  async uploadPhotos(req, res) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No photos uploaded' });
      }

      const photos = req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size
      }));

      // Analyze photos for food items
      const analysisId = Date.now().toString();
      const ingredients = await FoodRecognitionService.analyzePhotos(photos);

      // Store analysis results (in a real app, this would be in a database)
      global.analysisResults = global.analysisResults || {};
      global.analysisResults[analysisId] = {
        id: analysisId,
        photos,
        ingredients,
        timestamp: new Date()
      };

      res.json({
        success: true,
        analysisId,
        ingredients,
        photoCount: photos.length
      });
    } catch (error) {
      console.error('Error uploading photos:', error);
      res.status(500).json({ error: 'Failed to process photos' });
    }
  }

  async getAnalysis(req, res) {
    try {
      const { id } = req.params;
      
      global.analysisResults = global.analysisResults || {};
      const analysis = global.analysisResults[id];

      if (!analysis) {
        return res.status(404).json({ error: 'Analysis not found' });
      }

      res.json(analysis);
    } catch (error) {
      console.error('Error getting analysis:', error);
      res.status(500).json({ error: 'Failed to get analysis' });
    }
  }

  async deletePhoto(req, res) {
    try {
      const { id } = req.params;
      
      global.analysisResults = global.analysisResults || {};
      const analysis = global.analysisResults[id];

      if (!analysis) {
        return res.status(404).json({ error: 'Analysis not found' });
      }

      // Delete the physical files
      const deletionResults = await Promise.allSettled(
        analysis.photos.map(photo => {
          return new Promise((resolve, reject) => {
            fs.unlink(photo.path, (err) => {
              if (err) {
                console.warn(`Failed to delete file ${photo.path}:`, err);
                resolve({ status: 'failed', filename: photo.filename, error: err.message });
              } else {
                resolve({ status: 'deleted', filename: photo.filename });
              }
            });
          });
        })
      );

      // Remove the analysis from memory
      delete global.analysisResults[id];

      res.json({
        success: true,
        message: 'Analysis and photos deleted successfully',
        deletionResults: deletionResults.map(result => result.value)
      });
    } catch (error) {
      console.error('Error deleting photos:', error);
      res.status(500).json({ error: 'Failed to delete photos' });
    }
  }
}

module.exports = new PhotoController();