import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        if (req.method === 'GET') {
            const data = await kv.get('don_doi_ca') || [];
            return res.json(data);
        }

        if (req.method === 'POST') {
            const data = await kv.get('don_doi_ca') || [];
            const newRecord = req.body;
            newRecord.id = Date.now().toString();
            newRecord.createdAt = new Date().toISOString();
            data.push(newRecord);
            await kv.set('don_doi_ca', data);
            return res.json({ success: true, record: newRecord });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
