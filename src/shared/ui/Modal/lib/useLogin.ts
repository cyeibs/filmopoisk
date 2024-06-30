import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/RTK/store";
import { login, selectAuth } from "@/app/RTK/services/authSlice";
import { useModal } from "@/features/modalOpen/hook";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const { closeModal } = useModal();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const action = await dispatch(login({ username, password }));
    if (login.fulfilled.match(action)) {
      closeModal();
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    auth,
  };
};
