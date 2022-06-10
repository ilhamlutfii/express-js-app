'use strict';

const { uid } = require('../../helpers/uid');
const { Profile } = require('../../models/profile');

const all = async (params) => {
  try {
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : 100;
    const offset = (page * limit) - limit;

    const profiles = await Profile.findAll({
      limit: limit,
      offset: offset,
      order: [
        [params.order_by || 'updated_at', params.order_dir || 'DESC']
      ],
    });

    return {
      metadata: { http_code: 200, page, limit },
      data: profiles
    };
  } catch (error) {
    console.error('Error: Unable to execute all profile.admin => ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const show = async (id) => {
  try {
    const profile = await Profile.findOne({
      where: {
        id,
      }
    });

    if (!profile) {
      return {
        metadata: { http_code: 404 },
        error: { message: 'record_not_found' },
      };
    }

    return {
      metadata: { http_code: 200 },
      data: profile
    };
  } catch (error) {
    console.error('Error: Unable to execute show profile.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};


module.exports = {
  all,
  show,
};