import { Request, Response, Router } from 'express';
import StatsService from '../services/stats.service';
import { SuccessResult } from '../utils/result';
import { StatsPeriod } from '../types/stats';

class StatsController {
  private prefix: string = '/stats';
  public router: Router;
  private statsService: StatsService;

  constructor(
    router: Router,
    statsService: StatsService
  ) {
    this.router = router;
    this.statsService = statsService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.prefix}/:period`, (req: Request, res: Response) => 
      this.getStats(req, res)
    );

    this.router.put(this.prefix, (req: Request, res: Response) =>
      this.updateStats(req, res)
    );
  }

  private async getStats(req: Request, res: Response) {
    const period = req.params.period as StatsPeriod || StatsPeriod.ALL;
    const stats = await this.statsService.getStats(period);
    
    return new SuccessResult({
      msg: 'Stats found',
      data: stats
    }).handle(res);
  }

  private async updateStats(req: Request, res: Response) {
    const updatedStats = await this.statsService.updateStats(req.body);
    return new SuccessResult({
      msg: 'Stats updated',
      data: updatedStats
    }).handle(res);
  }
}

export default StatsController;
