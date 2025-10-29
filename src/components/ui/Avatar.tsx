const avatars = [
  "/icons/avatars/boy.svg",
  "/icons/avatars/boy2.svg",
  "/icons/avatars/girl.svg",
  "/icons/avatars/girl2.svg",
];

export interface AvatarProps {
  size?: number;
}

export default function Avatar({ size = 50 }: AvatarProps) {
  const avatar = avatars[Math.trunc(Math.random() * avatars.length - 1)];

  return (
    <img
      style={{
        width: size,
        height: size,
      }}
      src={avatar}
    />
  );
}
