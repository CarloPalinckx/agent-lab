import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    const filePath = path.join(process.cwd(), "data", "users.json");
    this.users = JSON.parse(fs.readFileSync(filePath, "utf-8")) as User[];
  }

  /**
   * Finds a user by their email address, returning undefined if not found.
   */
  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }
}
