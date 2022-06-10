'use strict';

const { uid } = require('../../helpers/uid');
const { Credit } = require('../../models/credit');

const all = async (params) => {
  try {
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : 100;
    const offset = (page * limit) - limit;

    const credits = await Credit.findAll({
      limit: limit,
      offset: offset,
      order: [
        [params.order_by || 'updated_at', params.order_dir || 'DESC']
      ],
    });

    return {
      metadata: { http_code: 200, page, limit },
      data: credits
    };
  } catch (error) {
    console.error('Error: Unable to execute all credit.admin => ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const create = async (params) => {
  try {
    let credit = await Credit.findOne({
      where: {
        name: params.name,
      }
    });

    if (credit) {
      return {
        metadata: { http_code: 409 },
        error: { message: 'name_has_already_been_registered' },
      };
    }

    const now = Date.now();
    credit = await Credit.create({
      id: uid(),      
      created_at: now,
      updated_at: now,

      user_id: params.user_id,
      credit: params.credit,
    });

    return {
      metadata: { http_code: 201 },
      data: credit,
    };
  } catch (error) {
    console.error('Error: Unable to execute create credit.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const show = async (id) => {
  try {
    const credit = await Credit.findOne({
      where: {
        id,
      }
    });

    if (!credit) {
      return {
        metadata: { http_code: 404 },
        error: { message: 'record_not_found' },
      };
    }

    return {
      metadata: { http_code: 200 },
      data: credit
    };
  } catch (error) {
    console.error('Error: Unable to execute show credit.admin ', error);
    
    return {
      metadata: { http_code: 500 },
      error: { message: 'unable_to_handle_request' },
    };
  }
};

const update = async (id, params) => {
  try {
    // data validation
    let credit = await Credit.findOne({
      where: {
        id,
      }
    });

    if (!credit) {
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

    if (params['credit']) {
      data['credit'] = params['credit'];
    }

    // data preparation end

    credit = await credit.update(data);

    return {
      metadata: { http_code: 200 },
      data: credit
    };
  } catch (error) {
    console.error('Error: Unable to execute update credit.admin ', error);
    
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