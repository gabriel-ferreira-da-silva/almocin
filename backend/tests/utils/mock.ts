import BaseRepository from "../../src/repositories/base.repository";

export class mockBaseRepository extends BaseRepository<any> {
  add = jest.fn();
  update = jest.fn();
  findOne = jest.fn();
  findAll = jest.fn();
  delete = jest.fn();
}