"use client";
import { ChevronLeftIcon, HeartIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import PhoneFrame from "../../../components/PhoneFrame";
import TabBar from "../../../components/TabBar";
import ThemeSwitcher from "../../../components/ThemeSwitcher";
import styles from "./comments.module.css";

type Comment = {
  id: number;
  author: string;
  time: string;
  content: string;
  likes: number;
  liked: boolean;
};

export default function CommentsPage({ params }: { params: { id: string } }) {
  const kasseId = params.id;
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Linda",
      time: "2 tim sedan",
      content: "Vilken fantastisk kasse! Älskar alla plagg här 💕",
      likes: 15,
      liked: false,
    },
    {
      id: 2,
      author: "Erik",
      time: "4 tim sedan",
      content: "Perfekt för vintagefynd!",
      likes: 8,
      liked: false,
    },
    {
      id: 3,
      author: "Sara",
      time: "6 tim sedan",
      content: "Kan någon dela tips på bra kombinationer?",
      likes: 12,
      liked: false,
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: "Du",
      time: "Nu",
      content: commentText,
      likes: 0,
      liked: false,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  const toggleLike = (id: number) => {
    setComments(
      comments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              liked: !comment.liked,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    );
  };

  return (
    <PhoneFrame title="Kommentarer" leftSlot={<ThemeSwitcher />}>
      <div className={styles.screen}>
        {/* Header */}
        <header className={styles.header}>
          <Link
            className={styles.backBtn}
            href={`/walkingclosets/kasse/${kasseId}`}
            aria-label="Tillbaka"
          >
            <ChevronLeftIcon className={styles.backIcon} aria-hidden="true" />
          </Link>

          <h1 className={styles.h1} data-lofi-only="true">
            Lorem ipsum
          </h1>
          <h1 className={styles.h1} data-hifi-only="true">
            Kommentarsfält kasse
          </h1>
        </header>

        {/* Content */}
        <div className={styles.content}>
          {/* Lofi */}
          <div data-lofi-only="true">
            <div className={styles.lofiBlock} />
            <div className={styles.lofiBlock} />
            <div className={styles.lofiBlock} />
            <div className={styles.lofiInput} />
          </div>

          {/* Hifi */}
          <div data-hifi-only="true" className={styles.hifiContent}>
            {/* Comments list */}
            <div className={styles.commentsList}>
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onToggleLike={() => toggleLike(comment.id)}
                />
              ))}
            </div>

            {/* Input form */}
            <form className={styles.inputForm} onSubmit={handleSubmit}>
              <input
                type="text"
                className={styles.input}
                placeholder="Skriv en kommentar..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button
                type="submit"
                className={styles.sendBtn}
                disabled={!commentText.trim()}
                aria-label="Skicka"
              >
                <PaperAirplaneIcon className={styles.sendIcon} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>

        <TabBar active="find" />
      </div>
    </PhoneFrame>
  );
}

function CommentItem({
  comment,
  onToggleLike,
}: {
  comment: Comment;
  onToggleLike: () => void;
}) {
  return (
    <div className={styles.commentItem}>
      <div className={styles.commentHeader}>
        <div className={styles.avatar} />
        <div className={styles.commentMeta}>
          <div className={styles.author}>{comment.author}</div>
          <div className={styles.time}>{comment.time}</div>
        </div>
      </div>
      <div className={styles.commentContent}>{comment.content}</div>
      <button
        type="button"
        className={`${styles.likeBtn} ${comment.liked ? styles.liked : ""}`}
        onClick={onToggleLike}
      >
        <HeartIcon className={styles.heartIcon} aria-hidden="true" />
        <span>{comment.likes}</span>
      </button>
    </div>
  );
}
