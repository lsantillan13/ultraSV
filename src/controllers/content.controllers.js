import Post from '../models/Post.model.js';

export const getLastFivePosts = async (req, res) => {
    try {
      const lastFivePosts = await Post.find().sort({ createdAt: -1 }).limit(5).lean();
      res.json(lastFivePosts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const getNextEightPosts = async (req, res) => {
    try {
      // Obtén los IDs de los últimos 5 posts para excluirlos de la siguiente consulta
      const lastFivePostsIds = (await Post.find().sort({ createdAt: -1 }).limit(5).lean()).map(post => post._id);
  
      // Encuentra los siguientes 8 posts excluyendo los últimos 5
      const nextEightPosts = await Post.find({ _id: { $nin: lastFivePostsIds } })
        .sort({ createdAt: -1 })
        .limit(8)
        .lean();
  
      res.json(nextEightPosts);
    } catch (error) {
      // Asegúrate de que el objeto 'res' esté disponible y no sea 'undefined'
      if (res && res.status) {
        res.status(500).json({ message: error.message });
      } else {
        console.error('Error: Objeto de respuesta no definido', error);
      }
    }
  };

// Función para la categoría 'política'
export const getPoliticalPosts = async (req, res) => {
    try {
      const posts = await Post.find({ 'Entry_Category': 'Política' })
        .sort({ createdAt: -1 })
        .lean();
      const response = {
        portada: posts[0],
        noticias: posts.slice(1, 3)
      };
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Función para la categoría 'economía'
  export const getEconomicPosts = async (req, res) => {
    try {
        const posts = await Post.find({ 'Entry_Category': 'Economía' })
          .sort({ createdAt: -1 })
          .lean();
        const response = {
          portada: posts[0],
          noticias: posts.slice(1, 3)
        };
        res.json(response);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  };
  
  // Función para la categoría 'sociedad'
  export const getSocialPosts = async (req, res) => {
    try {
        const posts = await Post.find({ 'Entry_Category': 'Sociedad' })
          .sort({ createdAt: -1 })
          .lean();
        const response = {
          portada: posts[0],
          noticias: posts.slice(1, 3)
        };
        res.json(response);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  };
  
  // Función para la categoría 'policiales'
  export const getPolicePosts = async (req, res) => {
    try {
      const posts = await Post.find({ 'Entry_Category': 'Policiales' })
        .sort({ createdAt: -1 })
        .lean();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getSportsPosts = async (req, res) => {
    try {
      const posts = await Post.find({ 'Entry_Category': 'Deportes' })
        .sort({ createdAt: -1 })
        .lean();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getTechnologyPosts = async (req, res) => {
    try {
      const posts = await Post.find({ 'Entry_Category': 'Tecnología' })
        .sort({ createdAt: -1 })
        .lean();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getLast = async (req, res) => {
    try {
      const last = await Post.find().sort({ createdAt: -1 }).limit(13).lean();
      res.json(last);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const postId = req.params.id; // Obtén el ID del post de los parámetros de la solicitud
        const post = await Post.findById(postId).lean(); // Busca el post por su ID
        if (!post) {
            return res.status(404).json({ message: 'Post not found' }); // Si no se encuentra el post, devuelve un error 404
        }
        res.json(post); // Si se encuentra el post, devuélvelo en formato JSON
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejo de errores
    }
};

// Función genérica para obtener las últimas noticias de una categoría
export const getLatestPostsByCategory = async (category, limit = 10) => {
  try {
      const posts = await Post.find({ 'Entry_Category': category })
          .sort({ createdAt: -1 })
          .limit(limit)
          .lean();
      return posts;
  } catch (error) {
      throw new Error(error.message);
  }
};

export const getPostsList = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 10 } = req.query // Valores por defecto

  try {
    const posts = await Post.find({category})
      .limit( limit * 1 )
      .skip((page - 1) * limit )
      .exec();

    const count = await Post.countDocuments({ category })

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
      res.status(500).send('Error interno del servidor');
    }
  
}

export const getRelatedPost = async (req, res) => {
  const { category, postId } = req.params;
  try{
    // Obtener las últimas 4 publicaciones de la misma categoría
    const latestPosts = await Post.find({ 'Entry_Category': category, '_id': { $ne: postId }})
      .sort({ createdAt: -1})
      .limit(4)
      .lean();

      res.json(latestPosts);
  }
  catch( error ){
    res.status(500).json({message: error.message});
  }
};


export const getStreaming = async (req, res) => {
  try {
    const posts = await Post.find({ 'Entry_Category': 'Streaming' })
      .sort({ createdAt: -1 })
      .lean();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getEmprender = async (req, res) => {
  try {
    const posts = await Post.find({ 'Entry_Category': 'Emprender' })
      .sort({ createdAt: -1 })
      .lean();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getEspectaculos = async (req, res) => {
  try {
    const posts = await Post.find({ 'Entry_Category': 'Espectáculos' })
      .sort({ createdAt: -1 })
      .lean()
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchPosts = async (req, res) => {
  try {
    const {query} = req.query; // Capturamos el parametro de la URL

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required'});
    }

    const posts  = await Post.find({
      $or: [
        { Entry_Title: { $regex: query, $options: 'i' } },
        { Entry_Body: { $regex: query, $options: 'i'} },
        { Entry_Category: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1}); // Ordena por la fecha de creación más reciente
    
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error en la busqueda', error });
  }
};
