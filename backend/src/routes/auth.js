import express from "express";
import path from "path";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { getUser, saveUser, checkCredentials } from "../db/dbUtils.js";

const checkUserExists = async (email) => {
  return (await getUser(email)) ? true : false;
};

const saltRounds = 10;
const addUserToDB = async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    await saveUser(user);
  } catch (error) {
    console.error("Error adding user to DB:", error);
    throw error;
  }
};

const authLogin = async (email, password) => {
  try {
    const user = await getUser(email);
    if (!user) return false; // User not found
    const match = await bcrypt.compare(password, user.password);
    return match;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};

const signUp = async (req, res) => {
  try {
    const userExists = await checkUserExists(req.body.email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      await addUserToDB(req.body);
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isAuthenticated = await authLogin(email, password);
    if (isAuthenticated) {
      return res.status(200).json({ message: "Authentication successful" });
    }
    return res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const setUpAuthRoutes = (router) => {
  router.post("/signup", signUp);
  router.post("/signin", signIn);

  return router;
};

export default setUpAuthRoutes;
