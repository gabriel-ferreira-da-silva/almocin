export default class Env {
  public static ENV = process.env.ENV || 'TEST';
  public static PORT = process.env.PORT || 5001;
}
