import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { id } = req.query;
        let data = await redis.get('don_doi_ca') || [];
        data = data.filter(item => item.id !== id);
        await redis.set('don_doi_ca', data);
        return res.json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
