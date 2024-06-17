import { Request, Response, Router } from 'express';
import { injectable, inject } from 'tsyringe';
import StatsService from '../services/stats.service';

@injectable()
class StatsController {
  public router: Router;

  constructor(
    router: Router,
    @inject(StatsService) private statsService: StatsService
  ) {
    this.router = router;
    this.routes();
  }

  private routes() {
    this.router.get('/stats', this.getStats.bind(this));
    this.router.put('/stats', this.updateStats.bind(this));
  }

  private async getStats(req: Request, res: Response) {
    const code = req.query.code as string;
    const stats = await this.statsService.getStats(code);
    res.status(200).json(stats);
  }

  private async updateStats(req: Request, res: Response) {
    const updatedStats = await this.statsService.updateStats(req.body);
    res.status(204).json(updatedStats);
  }
}

export default StatsController;
