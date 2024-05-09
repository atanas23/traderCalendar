import express from "express";
import path from "path";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { getUser, saveUser } from "../db/dbUtils.js";

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

const signUP = async (req, res) => {
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

const setUpAuthRoutes = (router) => {
  router.post("/signup", signUP);

  router.post("/signin", async (req, res) => {
    res.status(200).json({ message: "Connected to naMaikaTiPutkata" }); //check if exists, then return (200 with body, diff func )
    return res;
  });
  return router;
};

export default setUpAuthRoutes;
