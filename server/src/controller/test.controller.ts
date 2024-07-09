import { NextFunction, Request, Response } from "express";
import userModel, { User } from "../model/user.model";

class TestController {
    async remove(_req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userModel.deleteMany({ provider: "test" });
            return res.status(200).json({ data });
        } catch (e) {
            next(e);
        }
    }

    async add(_req: Request, res: Response, next: NextFunction) {
        try {
            const popularFigures = [
                "Harry Potter",
                "Kanye West",
                "Vincent van Gogh",
                "Jay-Z",
                "Sherlock Holmes",
                "Leonardo da Vinci",
                "Nicki Minaj",
                "Luke Skywalker",
                "J. Cole",
                "Pablo Picasso",
                "Darth Vader",
                "Post Malone",
                "Indiana Jones",
                "Ludwig van Beethoven",
                "Iron Man (Tony Stark)",
                "Charles Dickens",
                "Drake",
                "Marilyn Monroe",
                "Eminem",
                "Forrest Gump",
                "Frida Kahlo",
                "Kendrick Lamar",
                "James Bond",
                "Andy Warhol",
                "Travis Scott",
                "Cardi B",
                "Batman (Bruce Wayne)",
                "Elsa (Frozen)",
                "Wolfgang Amadeus Mozart",
                "William Shakespeare",
            ];
            const users = [];
            for (let i = 0; i < popularFigures.length; i++) {
                const displayName = popularFigures[i];
                const random = Math.random();
                const mail = random > 0.7 ? "mail" : random > 0.4 ? "gmail" : "yandex";
                const email =
                    displayName.replaceAll(" ", "").toLowerCase() +
                    "@" +
                    mail +
                    "." +
                    (mail !== "gmail" ? "ru" : "com");

                users[i] = {
                    provider: "test",
                    displayName,
                    role: "user",
                    email,
                    password: "123123123",
                    id: String(Math.random() + i),
                    isBanned: Math.random() > 0.5 ? true : false,
                    verified: Math.random() > 0.5 ? false : true,
                    banMessage: "TEST USER BAN MESSAGE",
                    banExpiration: new Date(new Date().setDate(new Date().getDate() + 65)),
                    photo: "test",
                };
            }
            const data = await userModel.insertMany(users);
            return res.status(200).json({ data });
        } catch (e) {
            next(e);
        }
    }

    async addNumber(req: Request, res: Response, next: NextFunction) {
        try {
            const number = Number(req.params.number) ?? 20;
            const users = [];

            for (let i = 0; i < number; i++) {
                const newUser: Partial<User> = {
                    email: `testemail${i}@mail.com`,
                    displayName: `Test User №${i}`,
                    password: `123${i}`,
                    role: "user",
                    id: String(Math.random() + i),
                    provider: "test",
                    isBanned: Math.random() > 0.5 ? true : false,
                    verified: Math.random() > 0.5 ? false : true,
                    banMessage: "TEST USER BAN MESSAGE",
                    banExpiration: new Date(new Date().setDate(new Date().getDate() + 65)),
                    photo: "test",
                };
                users[i] = newUser;
            }

            const data = await userModel.insertMany(users);
            return res.status(200).json({ data });
        } catch (e) {
            next(e);
        }
    }
}

export default new TestController();
