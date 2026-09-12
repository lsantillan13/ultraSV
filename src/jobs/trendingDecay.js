import cron from 'node-cron';
import mongoose from 'mongoose';

const getPostModel = () => mongoose.models.Post || mongoose.model('Post');

export const startTrendingJobs = () => {
  cron.schedule('0 * * * *', async () => {
    try {
      const Post = getPostModel();
      const now = new Date();
      const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      await Post.updateMany(
        { lastViewedAt: { $lt: dayAgo }, views24h: { $gt: 0 } },
        { $set: { views24h: 0 } }
      );
      await Post.updateMany(
        { lastViewedAt: { $lt: weekAgo }, views7d: { $gt: 0 } },
        { $set: { views7d: 0 } }
      );
      await Post.updateMany(
        { trendingScore: { $gt: 0 } },
        [
          {
            $set: {
              trendingScore: {
                $max: [
                  0,
                  {
                    $multiply: [
                      {
                        $add: [
                          { $multiply: ["$views24h", 2] },
                          { $multiply: ["$views7d", 0.5] },
                          { $multiply: ["$views", 0.05] }
                        ]
                      },
                      0.95
                    ]
                  }
                ]
              }
            }
          }
        ]
      );
      console.log('[CRON] trending decay ok');
    } catch (e) {
      console.error('[CRON] trending error', e);
    }
  });
  console.log('[CRON] jobs de trending iniciados - corre cada hora');
};