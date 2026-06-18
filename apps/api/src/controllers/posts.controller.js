const { supabase } = require('../lib/supabase.lib');
const { success, failure, paginated } = require('../lib/response.lib');

function enrichPost(post, user) {
  return {
    id: post.id,
    title: post.title,
    created_at: post.created_at,
    user: { id: user.id, email: user.email },
  };
}

async function create(req, res, next) {
  try {
    const { title } = req.body;

    if (typeof title !== 'string' || title.trim().length === 0) {
      return failure(res, 'Title must be a non-empty string', 400);
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: title.trim(),
        user_id: req.user.id,
      })
      .select('id,title,user_id,created_at')
      .single();

    if (error) {
      return next(error);
    }

    return success(res, enrichPost(data, req.user), 201);
  } catch (error) {
    return next(error);
  }
}

async function list(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id,title,user_id,created_at')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return next(error);
    }

    const enriched = data.map(post => enrichPost(post, req.user));

    return paginated(res, enriched, enriched.length);
  } catch (error) {
    return next(error);
  }
}

module.exports = { create, list };
