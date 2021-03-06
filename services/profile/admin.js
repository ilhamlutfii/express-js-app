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

const create = async (params) => {
  try {
    let profile = await Profile.findOne({
      where: {
        name: params.name,
      }
    });

    if (profile) {
      return {
        metadata: { http_code: 409 },
        error: { message: 'name_has_already_been_registered' },
      };
    }

    const now = Date.now();
    profile = await Profile.create({
      id: uid(),      
      created_at: now,
      updated_at: now,

      user_id: params.user_id,
      first_name: params.first_name,
      last_name : params.last_name,
      headline : params.headline,
      biography: params.biography,
      language: params.language,
      website: params.website,
      twitter: params.twitter,
      facebook : params.facebook,
      linkedin : params.linkedin,
    });

    return {
      metadata: { http_code: 201 },
      data: profile,
    };
  } catch (error) {
    console.error('Error: Unable to execute create profile.admin ', error);
    
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

const update = async (id, params) => {
  try {
    // data validation
    let profile = await Profile.findOne({
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
    // data validation

    // data preparation
    const data = {
      updated_at: Date.now()
    };

    if (params['user_id']) {
      data['user_id'] = params['user_id'];
    }

    if (params['first_name']) {
      data['first_name'] = params['first_name'];
    }

    if (params['last_name']) {
      data['last_name'] = params['last_name'];
    }

    if (params['headline']) {
      data['headline'] = params['headline'];
    }

    if (params['language']) {
      data['language'] = params['language'];
    }

    if (params['website']) {
      data['website'] = params['website'];
    }

    if (params['twitter']) {
      data['twitter'] = params['twitter'];
    }

    if (params['facebook']) {
      data['facebook'] = params['facebook'];
    }

    if (params['linkedin']) {
      data['linkedin'] = params['linkedin'];
    }
    // data preparation end

    profile = await profile.update(data);

    return {
      metadata: { http_code: 200 },
      data: profile
    };
  } catch (error) {
    console.error('Error: Unable to execute update profile.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

module.exports = {
  all,
  create,
  show,
  update,
};