// components/CommentBox.tsx
'use client'; // <-- required for client‑side interactivity in Next 13+

import { useEffect, useState } from 'react';

type Comment = {
  id: string;
  html: string;
};

export default function CommentBox() {
  const STORAGE_KEY = 'my-comments';

  // -----------------------------------------------------------------
  // 1️⃣ Load comments from localStorage (or fall back to sample data)
  // -----------------------------------------------------------------
  const sampleComments: Comment[] = [
    {
      id: 'c1',
      html: '<p><strong>Alice:</strong> I love <em>Next.js</em>! 🚀</p>',
    },
    {
      id: 'c2',
      html: '<p><strong>Bob:</strong> Check out <a href="https://proton.me">Proton</a> – great privacy tools.</p>',
    },
    {
      id: 'c3',
      html: '<p><strong>Carol:</strong> <script>alert("XSS demo");</script></p>', // intentional raw‑HTML demo
    },
  ];

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  // Load once on mount
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      try {
        setComments(JSON.parse(stored));
      } catch {
        // If parsing fails, fall back to samples
        setComments(sampleComments);
      }
    } else {
      setComments(sampleComments);
    }
  }, []);

  // -----------------------------------------------------------------
  // 2️⃣ Helper: persist the whole comment array to localStorage
  // -----------------------------------------------------------------
  const persist = (list: Comment[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
  };

  // -----------------------------------------------------------------
  // 3️⃣ Add a new comment (raw HTML string)
  // -----------------------------------------------------------------
  const addComment = () => {
    if (!newComment.trim()) return;

    const newEntry: Comment = {
      id: crypto.randomUUID(),
      html: newComment,
    };
    const updated = [...comments, newEntry];
    setComments(updated);
    persist(updated);
    setNewComment(''); // clear textarea
  };

  // -----------------------------------------------------------------
  // 4️⃣ Render UI
  // -----------------------------------------------------------------
  return (
    <section style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <h2>Comments</h2>

      {/* Existing comments */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {comments.map((c) => (
          <li
            key={c.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '0.75rem',
              marginBottom: '0.5rem',
            }}
            // Render raw HTML (dangerous!)
            dangerouslySetInnerHTML={{ __html: c.html }}
          />
        ))}
      </ul>

      {/* New comment form */}
      <div style={{ marginTop: '1rem' }}>
        <textarea
          rows={4}
          placeholder="Write raw HTML here…"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{ width: '100%', fontFamily: 'monospace', padding: '0.5rem' }}
        />
        <button
          onClick={addComment}
          style={{
            marginTop: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#0066ff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add comment
        </button>
      </div>
    </section>
  );
}