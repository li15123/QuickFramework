import { TankBettle } from "../data/TankBattleGameData";
import TankBettleBullet from "./TankBattleBullet";

const {ccclass, property} = cc._decorator;
@ccclass
export default class TankBattleBlock extends cc.Component {

    public type : TankBettle.BLOCK_TYPE = null;

   /**
     * @description 当碰撞产生的时候调用
     * @param other 产生碰撞的另一个碰撞组件
     */
    private onCollisionEnter(other: cc.BoxCollider, me: cc.BoxCollider) {
        //处理受到来自子弹的碰撞
        this.handBullet(other,me);
    }

    /**
     * @description 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param other 产生碰撞的另一个碰撞组件
     */
    private onCollisionStay(other: cc.BoxCollider, me: cc.BoxCollider) {
        
    }

    /**
     * @description 当碰撞结束后调用
     * @param other 产生碰撞的另一个碰撞组件
     */
    private onCollisionExit(other: cc.BoxCollider, me: cc.BoxCollider) {
        
    }

    private handBullet( other:cc.BoxCollider , me : cc.BoxCollider ){
        if( other.node.group == TankBettle.GROUP.Bullet ){
            switch( this.type ){
                case TankBettle.BLOCK_TYPE.GRASS: //草丛
                case TankBettle.BLOCK_TYPE.ICE:{ //冰面
                    //直接穿过，不做处理
                }
                break;
                case TankBettle.BLOCK_TYPE.WALL:{
                    //把自己移除
                    this.node.removeFromParent();
                }
                break;
                case TankBettle.BLOCK_TYPE.STONE_WALL:{
                    let bullet = other.node.getComponent(TankBettleBullet);
                    if( bullet.owner.hasStatus(TankBettle.PLAYER_STATUS.STRONG) ){
                        this.node.removeFromParent();
                    }
                }
                break;
            }
        }
    }
}
